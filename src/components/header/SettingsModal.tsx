import React, { useEffect, useState } from 'react';
import BackDrop from '../backdrop/BackDrop';
import package_json from '../../../package.json';
import './SettingsModal.scss';
import CustomCaption from './CustomCaption';

interface SettingsModalProps {
  openSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CaptionStyleType {
  fontSize: {
    [key: string]: number;
    small: number;
    medium: number;
    large: number;
  };
}

function getMaxConSettings(): string | null {
  return localStorage.getItem('MaxCon');
}

function setMaxConSettings(maxCon: number) {
  localStorage.setItem('MaxCon', String(maxCon));
}

function getBandWidthLimit(): string | null {
  return localStorage.getItem('Bandwidth');
}

function setBandWidthLimit(speed: number) {
  localStorage.setItem('Bandwidth', String(speed));
}

function SettingModal(props: SettingsModalProps) {
  const [maxCon, updateMaxCon] = useState<number>(55);
  const [bandwidthLimit, updateBandwidthLimit] = useState<number>(-1);
  const [cachedSpaceTitle, updateCachedSpaceTitle] = useState<string>('');
  const [torrentLink, updateTorrentLink] = useState<string>('');
  const [playing, setPlaying] = useState<boolean>(false);
  const [isSubtitleExpand, updateIsSubtitleExpand] = useState<boolean>(false);
  const [captionStyle, updateCaptionStyle] = useState<CaptionStyleType>({
    fontSize: {
      small: 13,
      medium: 15,
      large: 21,
    },
  });

  useEffect(() => {
    const maxCon = getMaxConSettings();
    const bandwidthLimit = getBandWidthLimit();
    if (maxCon !== null) {
      updateMaxCon(Number(maxCon));
    }

    if (bandwidthLimit !== null) {
      updateBandwidthLimit(Number(bandwidthLimit));
    }

    // @ts-expect-error ** fetch  caption style data**
    window.api.send('style:caption', { type: 'get' });
    // @ts-expect-error
    window.api.receive('get:style:caption', (args: CaptionStyleType) => {
      updateCaptionStyle(args);
    });
  }, []);

  const handleMaxConChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value) <= 0) {
      updateMaxCon(55);
    } else {
      updateMaxCon(Number(e.currentTarget.value));
    }
  };

  const handleBandwidthLimitChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value) <= 0) {
      updateBandwidthLimit(-1);
    } else {
      updateBandwidthLimit(Number(e.currentTarget.value));
    }
  };

  const handleCloseModal = () => {
    props.openSettings(false);
    setMaxConSettings(maxCon);
    setBandWidthLimit(bandwidthLimit);

    // @ts-expect-error
    window.api.send('style:caption', {
      type: 'save',
      data: captionStyle,
    });
  };

  const handleOpenLink = (link: string) => {
    // @ts-expect-error
    window.api.send('ExternalLink:Open', link);
    handleCloseModal();
  };

  const handleClearCache = () => {
    // @ts-expect-error
    window.api.send('Cache:ClearCache', null);
    handleCloseModal();
  };

  const handleShowCachedSpace = () => {
    // @ts-expect-error
    window.api.send('Cache:ShowSpaceRequest', null);
    // @ts-expect-error
    window.api.receive('Cache:ShowSpaceResponse', (data: string) => {
      updateCachedSpaceTitle(data);
    });
  };

  const handlePlayExternalSrc = async () => {
    if (torrentLink.trim() !== '') {
      setPlaying(true);
      // @ts-expect-error
      await window.api.invoke('video:play', {
        hash: torrentLink,
        maxCon,
        bandwidthLimit,
      });
      setPlaying(false);
      handleCloseModal();
    }
  };

  const handleSubtitleExpand = () => {
    updateIsSubtitleExpand(!isSubtitleExpand);
  };

  const handleFontSizeValue = (position: string, value: number) => {
    const temp = { ...captionStyle };
    temp.fontSize[position.toLowerCase()] = value;
    updateCaptionStyle(temp);
  };

  return (
    <React.Fragment>
      <BackDrop onClick={handleCloseModal} />
      <div className="settings-modal">
        <div className="settings-modal__header">
          <h5 className="settings-modal__header-title">
            YST Settings v{package_json.version}
          </h5>
          <button
            type="button"
            className="settings-modal__header-close"
            onClick={handleCloseModal}
          >
            ×
          </button>
        </div>
        
        <div className="settings-modal__body">
          <div className="settings-modal__section">
            <div className="settings-modal__form-group">
              <label
                htmlFor="max_connection"
                className="settings-modal__form-group-label"
                title="Default: 55"
              >
                Max Connection on Torrent
              </label>
              <input
                type="number"
                className="settings-modal__form-group-input"
                id="max_connection"
                value={maxCon}
                onChange={handleMaxConChange}
              />
            </div>
          </div>
          
          <div className="settings-modal__section">
            <div className="settings-modal__form-group">
              <label
                htmlFor="speed_limit"
                className="settings-modal__form-group-label"
                title="Default: -1"
              >
                Limit Up/Down Speed (MB)
              </label>
              <input
                type="number"
                className="settings-modal__form-group-input"
                id="speed_limit"
                min={-1}
                value={bandwidthLimit}
                onChange={handleBandwidthLimitChange}
              />
            </div>
          </div>
          
          <div className="settings-modal__section">
            <h6 className="settings-modal__section-title">External Torrent</h6>
            <div className="settings-modal__form-group">
              <label htmlFor="magnetLink" className="settings-modal__form-group-label">
                Play from External Source {playing ? '(Opening Player...)' : ''}
              </label>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <input
                type="text"
                className="settings-modal__form-group-input"
                style={{flex: 1}}
                id="magnetLink"
                value={torrentLink}
                onChange={(e) => {
                  updateTorrentLink(e.currentTarget.value);
                }}
                onKeyUp={(e) => {
                  if (e.code.toLowerCase() === 'enter') {
                    handlePlayExternalSrc();
                  }
                }}
                placeholder="Torrent magnet link / Torrent hash"
              />
              <button
                className="settings-modal__button"
                style={{width: 'auto', padding: '0 15px'}}
                onClick={handlePlayExternalSrc}
                disabled={playing}
              >
                {playing ? '...' : 'Play'}
              </button>
            </div>
          </div>
          
          <div className="settings-modal__section">
            <div className="settings-modal__subtitle-options">
              <div 
                className="settings-modal__subtitle-options-header"
                onClick={handleSubtitleExpand}
              >
                <div className="settings-modal__subtitle-options-header-title">
                  Subtitle/CC
                </div>
                <div className="settings-modal__subtitle-options-header-icon">
                  {isSubtitleExpand ? '▲' : '▼'}
                </div>
              </div>
              
              {isSubtitleExpand && (
                <div className="settings-modal__subtitle-options-content">
                  <p>
                    Customize caption based on screen size: (Re-open player
                    window to see the changes)
                  </p>
                  <CustomCaption
                    label={'Large'}
                    initialValue={captionStyle.fontSize.large}
                    handleFontSizeValue={handleFontSizeValue}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="settings-modal__section">
            <h6 className="settings-modal__section-title">Actions</h6>
            <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
              <button
                className="settings-modal__button"
                style={{flex: 1}}
                onClick={() => {
                  // @ts-expect-error
                  window.api.send('check-for-updates');
                }}
              >
                Vérifier les mises à jour
              </button>
              
              <button
                className="settings-modal__button"
                style={{flex: 1}}
                onClick={handleClearCache}
              >
                Clear Cache
              </button>
              
              <button
                className="settings-modal__button"
                style={{flex: 1}}
                onClick={handleShowCachedSpace}
              >
                Show Cached Space
              </button>
            </div>
            
            {cachedSpaceTitle && (
              <p className="text-center mt-2">{cachedSpaceTitle}</p>
            )}
          </div>
          
          <div className="settings-modal__section">
            <div className="d-flex align-items-center justify-content-center" style={{gap: '15px'}}>
              <span>Special thanks to:</span>
              <button
                className="settings-modal__button"
                style={{width: 'auto', padding: '5px 15px'}}
                onClick={() => {
                  handleOpenLink('https://webtorrent.io');
                }}
              >
                Web Torrent
              </button>
            </div>
          </div>
          

        </div>
        
        <div className="settings-modal__footer">
          <button
            type="button"
            className="settings-modal__button"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SettingModal;
export { getMaxConSettings, getBandWidthLimit };