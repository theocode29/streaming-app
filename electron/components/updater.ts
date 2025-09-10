import { app, dialog, BrowserWindow, ipcMain } from 'electron';
import electronUpdater from 'electron-updater';
import electronLog from 'electron-log';
import isDev from 'electron-is-dev';

// Récupération des objets depuis les modules
const autoUpdater = electronUpdater.autoUpdater;
const log = electronLog.default || electronLog;

// Configure logging
log.transports.file.level = 'info';
autoUpdater.logger = log;

// Configuration des options de mise à jour
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

// URL du repository GitHub pour les mises à jour
const GITHUB_REPO = 'freenox20-svg/Streaming-app';

export function initUpdater(mainWindow) {
  // Ne pas vérifier les mises à jour en mode développement
  if (isDev) {
    return;
  }

  // Configuration de l'URL du repository pour les mises à jour
  autoUpdater.setFeedURL({
    provider: 'github',
    owner: GITHUB_REPO.split('/')[0],
    repo: GITHUB_REPO.split('/')[1],
  });

  // Vérifier les mises à jour au démarrage
  autoUpdater.checkForUpdates();

  // Planifier une vérification périodique des mises à jour (toutes les 6 heures)
  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 6 * 60 * 60 * 1000);

  // Événement : mise à jour disponible
  autoUpdater.on('update-available', (info) => {
    log.info('Mise à jour disponible:', info);
    dialog
      .showMessageBox(mainWindow, {
        type: 'info',
        title: 'Mise à jour disponible',
        message: `Une nouvelle version (${info.version}) est disponible. Voulez-vous la télécharger maintenant ?`,
        buttons: ['Télécharger', 'Plus tard'],
        defaultId: 0,
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.downloadUpdate();
        }
      });
  });

  // Événement : aucune mise à jour disponible
  autoUpdater.on('update-not-available', () => {
    log.info('Aucune mise à jour disponible');
  });

  // Événement : progression du téléchargement
  autoUpdater.on('download-progress', (progressObj) => {
    const progressPercent = Math.round(progressObj.percent);
    mainWindow.setProgressBar(progressPercent / 100);
    mainWindow.webContents.send('update-progress', progressPercent);
  });

  // Événement : téléchargement terminé
  autoUpdater.on('update-downloaded', (info) => {
    log.info('Mise à jour téléchargée:', info);
    mainWindow.setProgressBar(-1); // Masquer la barre de progression
    dialog
      .showMessageBox(mainWindow, {
        type: 'info',
        title: 'Mise à jour prête',
        message: `La version ${info.version} a été téléchargée. L'application redémarrera pour installer la mise à jour.`,
        buttons: ['Redémarrer maintenant', 'Plus tard'],
        defaultId: 0,
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall(false, true);
        }
      });
  });

  // Événement : erreur de mise à jour
  autoUpdater.on('error', (err) => {
    log.error('Erreur de mise à jour:', err);
  });

  // Gestionnaire d'événements IPC pour vérifier manuellement les mises à jour
  ipcMain.on('check-for-updates', () => {
    autoUpdater.checkForUpdates();
  });
}