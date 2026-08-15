import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Globe, BrowserChrome, Globe2 } from 'react-bootstrap-icons';
import UIModal from './UIModal';

function UIInput({ label, type, value, onChange }) {
    const [urlInput, setUrlInput] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const validateUrl = (url) => {
        if (!url.trim()) {
            setIsValidUrl(null);
            setErrorMessage('');
            return false;
        }

        try {
            new URL(url);
            setIsValidUrl(true);
            setErrorMessage('');
            return true;
        } catch (error) {
            setIsValidUrl(false);
            setErrorMessage('Insira uma URL RSS válida (ex: https://g8.com/rss)');
            return false;
        }
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setUrlInput(newValue);
        validateUrl(newValue);
        onChange?.(e);
    };

    return (
        <>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><Globe color="royalblue" size={30} /></InputGroup.Text>
                <Form.Control
                    placeholder="Digite a URL da fonte de notícia"
                    aria-label="URL"
                    aria-describedby="basic-addon1"
                    value={urlInput}
                    onChange={handleInputChange}
                    isInvalid={isValidUrl === false}
                    isValid={isValidUrl === true}
                />
                <UIModal />
                <Form.Control.Feedback type="invalid">
                    {errorMessage}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                    URL RSS válida
                </Form.Control.Feedback>
            </InputGroup>
        </>
    );
}

export default UIInput;