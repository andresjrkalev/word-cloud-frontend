import React, { ChangeEvent, useEffect, useState } from 'react';

import { ENDPOINT_MESSAGE, KEY_TEXT, MAX_FILE_SIZE, TIMEOUT_MESSAGES } from 'common/constants';
import httpClient from 'common/httpClient';
import Message from 'type/model/message';
import Occurrence from 'type/model/occurrence';

const Application = () => {
  const [messages, setMessages] = useState<Message[]>();
  const [file, setFile] = useState<File>();
  const [fetching, setFetching] = useState<boolean>();
  const getMessages = async () => {
    const data = await httpClient.get(ENDPOINT_MESSAGE);

    if (data.length) setMessages((messages?: Message[]) => {
      if (!messages) messages = new Array();
      return [...data, ...messages];
    });
  };
  const handleFile = ({ target: { files }}: ChangeEvent<HTMLInputElement>) => {
    if (!files) {
      alert('File not found!');
      return;
    }
    const file = files[0];

    if (file.size > MAX_FILE_SIZE) {
      alert('File size cannot be bigger than 100MB!');
      return;
    }
    setFile(file);
  };
  const upload = async () => {
    const response = await httpClient.post(ENDPOINT_MESSAGE, { file });

    if (!response) {
      alert('Something went wrong, please try again!');
      return;
    }
    setFetching(true);
    setFile(undefined);
    setTimeout(async () => {
      await getMessages();
      setFetching(undefined);
    }, TIMEOUT_MESSAGES);
  };
  useEffect(() => {
    getMessages();
  }, []);
  return (
    <>
      <h1>Word cloud</h1>
      <input type="file" accept="text/plain" onChange={handleFile} />
      <button onClick={upload} disabled={!file}>Upload</button>
      <div className="loading">
        &nbsp;{fetching && <i>Processing text...</i>}
      </div>
      <h2>Texts</h2>
      <hr />
      {messages?.map(({ value, occurrences }: Message, index: number) =>
        <div key={KEY_TEXT(index)}>
          <p>{value}</p>
          <strong>Word occurrences:</strong>
          {occurrences.map(({ word, count }: Occurrence, i: number) => <p key={i.toString()}>{word}: {count}</p>)}
          <hr />
        </div>
      )}
    </>
  );
};

export default Application;
