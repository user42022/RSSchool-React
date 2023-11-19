import { Character } from '../../types/types';

interface SearchParams {
  'filter[name_cont]': string | null;
}

export const createCharacterFromParams = (
  params: SearchParams | string
): Character => {
  const randomNumber = Math.round(Math.random() * 1000000000);
  const content = typeof params === 'string' ? params : randomNumber;
  const searchValue =
    typeof params === 'string' ? params : params['filter[name_cont]'];

  return {
    id: `${content}`,
    type: `type-${content}`,
    attributes: {
      slug: `slug-${content}`,
      alias_names: [`alias_names-${content}`],
      animagus: `animagus-${content}`,
      blood_status: `blood_status-${content}`,
      boggart: `boggart-${content}`,
      born: `born-${content}`,
      died: `died-${content}`,
      eye_color: `eye_color-${content}`,
      family_members: [`family_members-${content}`],
      gender: `gender-${content}`,
      hair_color: `hair_color-${content}`,
      height: `height-${content}`,
      house: `house-${content}`,
      image: `image-${content}`,
      jobs: [`jobs-${content}`],
      marital_status: `marital_status-${content}`,
      name: `name-${searchValue}`,
      nationality: `nationality-${content}`,
      patronus: `patronus-${content}`,
      romances: [`romances-${content}`],
      skin_color: `skin_color-${content}`,
      species: `species-${content}`,
      titles: [`titles-${content}`],
      wands: [`wands-${content}`],
      weight: `weight-${content}`,
      wiki: `wiki-${content}`,
    },
    links: {
      self: `self-${content}`,
    },
  };
};
