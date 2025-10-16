import type { JSX } from 'react';
import { PrimaryButton } from 'components';
import { RecordHeader } from 'pages/Main/CurrentGame/Record/RecordHeader';
import { RecordScore } from 'pages/Main/CurrentGame/Record/RecordScore';
import { RecordButtons } from 'pages/Main/CurrentGame/Record/RecordButtons';

type Props = {
  disableRecordMode: () => void;
};

export const Record = ({ disableRecordMode }: Props): JSX.Element => {
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
