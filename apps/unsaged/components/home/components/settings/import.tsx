import { IconFileImport } from '@tabler/icons-react';
import { FC, useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { SupportedExportFormats } from '@/types/export';
import { SystemPrompt } from '@/types/system-prompt';

import { SidebarButton } from '@/components/common/side-bar/side-bar-button';

import { useSystemPrompts } from '@/providers/system_prompts';

interface Props {
  onImport: (
    data: SupportedExportFormats,
    systemPrompts: SystemPrompt[],
  ) => void;
}

export const Import: FC<Props> = ({ onImport }) => {
  const { t } = useTranslation('sidebar');

  const { systemPrompts } = useSystemPrompts();

  return (
    <>
      <input
        id="import-file"
        className="sr-only"
        tabIndex={-1}
        type="file"
        accept=".json"
        onChange={(e) => {
          if (!e.target.files?.length) return;

          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            let json = JSON.parse(e.target?.result as string);
            onImport(json, systemPrompts);
          };
          reader.readAsText(file);
        }}
      />

      <SidebarButton
        text={t('Import data')}
        icon={<IconFileImport size={18} />}
        onClick={() => {
          const importFile = document.querySelector(
            '#import-file',
          ) as HTMLInputElement;
          if (importFile) {
            importFile.click();
          }
        }}
      />
    </>
  );
};
