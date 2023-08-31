import RtmButton from '@/components/misc/RtmButton';
import DiscordConfig from '@/config/discord';
import { getServerSideTranslation } from '@/i18n';
import UniversalVocab from '@/i18n/locales/UniversalVocab';
import i18nTaxonomy from '@/taxonomies/i18n';
import { i18nComponentProps } from '@/types/Next';
import { CogIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { CSSProperties, FunctionComponent } from 'react';

interface HomepageInnerProps extends i18nComponentProps {}

// {ToDo} Please, design a real logo
const style: CSSProperties = {
  filter: 'invert(42%) sepia(7%) saturate(5518%) hue-rotate(189deg) brightness(92%) contrast(91%)'
};
const [width, height]: [number, number] = [226, 69];

export const HomepageInner: FunctionComponent<HomepageInnerProps> = async ({ i18nProps }) => {
  const lng = i18nProps[i18nTaxonomy.langFlag];
  const { t } = await getServerSideTranslation(lng);

  return (
    <div className="m-auto">
      <Image src="/assets/rtm-txt-logo.svg" {...{ style, width, height }} alt={`${UniversalVocab.brand} (${t('logo')})`} />
      <h1 className="mt-2">{UniversalVocab.brand}</h1>
      <RtmButton label={t('invite-the-bot')} __IconComponent={<CogIcon className="h-7 w-7" />} href={DiscordConfig.botInviteLink} />
    </div>
  );
};

export default HomepageInner;
