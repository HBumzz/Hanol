import { useEffect, useState } from 'react';
import styled from 'styled-components';

const useA2HS = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const installApp = () => {
    deferredPrompt?.prompt();
    deferredPrompt?.userChoice.then(() => {
      clearPrompt();
    });
  };

  const clearPrompt = () => {
    setDeferredPrompt(null);
  };

  return { deferredPrompt, installApp, clearPrompt };
};

const A2HS = () => {
  const { deferredPrompt, installApp, clearPrompt } = useA2HS();

  return deferredPrompt ? (
    <div>
      <SnackbarContainer>
        <div className="button-container">
          <button onClick={installApp}>앱으로 이용하기</button>
          <button onClick={clearPrompt}>취소</button>
        </div>
      </SnackbarContainer>
    </div>
  ) : null;
};

const SnackbarContainer = styled.div`
  position: fixed;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  background-color: #fff;
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: calc(100% - 46px);
  width: min(404px, calc(100% - 46px));
  color: #3fcc8a;
  border: 1px solid #3fcc8a;
  z-index: 11111;

  .button-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  button {
    flex: 1;
    margin: 0 8px; /* Adjust margin as needed */
  }
`;

export default A2HS;