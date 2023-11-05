export type GetCharacterParams = {
  characterName: string;
  pageSize: number;
  pageNumber: number;
};

export type MetaInfo = {
  pagination: {
    current: number;
    records: number;
  };
  copyright: string;
  generated_at: string;
};

export type CharacterData = {
  id: string;
  type: string | null;
  attributes: {
    slug: string | null;
    alias_names: string[];
    animagus: string | null;
    blood_status: string | null;
    boggart: string | null;
    born: string | null;
    died: string | null;
    eye_color: string | null;
    family_members: string[];
    gender: string | null;
    hair_color: string | null;
    height: string | null;
    house: string | null;
    image: string | null;
    jobs: string[];
    marital_status: string | null;
    name: string | null;
    nationality: string | null;
    patronus: string | null;
    romances: string[];
    skin_color: string | null;
    species: string | null;
    titles: string[];
    wands: string[];
    weight: string | null;
    wiki: string | null;
  };
  links: {
    self: string | null;
  };
};

export type CharacterResponse<T> = {
  data: T;
  meta: MetaInfo;
};
