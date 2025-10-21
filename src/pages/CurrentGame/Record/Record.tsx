import type { JSX } from 'react';
import { PrimaryButton } from 'components';
import { RecordHeader } from 'pages/CurrentGame/Record/RecordHeader';
import { RecordScore } from 'pages/CurrentGame/Record/RecordScore';
import { RecordButtons } from 'pages/CurrentGame/Record/RecordButtons';

export const Record = ({ disableRecordMode }): JSX.Element => {
  return (
    <div className="flex h-full flex-col items-center justify-between px-4 pt-4 pb-25">
      <RecordHeader disableRecordMode={disableRecordMode} />
      <RecordScore />

      <div className="flex flex-col items-center">
        <RecordButtons />
        <PrimaryButton onClick={() => console.log('игра записана')}>Записать</PrimaryButton>
      </div>
    </div>
  );
};
