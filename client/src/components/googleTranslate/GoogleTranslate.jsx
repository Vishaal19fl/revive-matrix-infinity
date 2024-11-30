import React, { useEffect, useRef } from 'react';
import './GoogleTranslate.scss';

const GoogleTranslate = () => {
  const googleTranslateElementRef = useRef(null);

  useEffect(() => {
    const loadGoogleTranslateScript = () => {
      const googleTranslateScript = document.createElement('script');
      googleTranslateScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      googleTranslateScript.async = true;
      document.head.appendChild(googleTranslateScript);

      window.googleTranslateElementInit = () => {
        if (window.google && googleTranslateElementRef.current) {
          const existingElement = document.getElementById('google_translate_element');
          if (existingElement) {
            existingElement.innerHTML = '';
          }

          new window.google.translate.TranslateElement(
            { pageLanguage: 'en' },
            'google_translate_element'
          );
        }
      };
    };

    const checkAndReloadTranslateElement = () => {
      if (window.google && googleTranslateElementRef.current) {
        window.google.translate.TranslateElement.getInstance().reloadTranslate();
      }
    };

    loadGoogleTranslateScript();
    checkAndReloadTranslateElement();
    window.addEventListener('load', checkAndReloadTranslateElement);

    return () => {
      const existingElement = document.getElementById('google_translate_element');
      if (existingElement) {
        existingElement.innerHTML = '';
      }
      window.removeEventListener('load', checkAndReloadTranslateElement);
    };
  }, []);

  return <div id="google_translate_element" ref={googleTranslateElementRef}></div>;
};

export default GoogleTranslate;