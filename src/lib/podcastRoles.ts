export enum PODCAST_ROLE_GROUPS {
  administrator = 'administrator',
  audio_production = 'audio_production',
  audio_post_production = 'audio_post_production',
  cast = 'cast',
  video_production = 'video_production',
  video_post_production = 'video_post_production',
  community = 'community',
  creative_director = 'creative_director',
  design = 'design',
  writing = 'writing',
  other = 'other',
}

export enum ADMINISTRATOR_ROLES {
  booking_coordinator = 'booking_coordinator',
  content_manager = 'content_manager',
  marketing_manager = 'marketing_manager',
  production_assistant = 'production_assistant',
  production_coordinator = 'production_coordinator',
  sales_manager = 'sales_manager',
  sales_representative = 'sales_representative',
}

export enum CAST_ROLES {
  announcer = 'announcer',
  co_host = 'co_host',
  guest = 'guest',
  geuest_host = 'geuest_host',
  host = 'host',
  narrator = 'narrator',
  reporter = 'repoter',
  voice_actor = 'voice_actor',
}

export enum COMMUNITY_ROLES {
  social_media_manager = 'social_media_manager',
}

export enum DESIGN_ROLES {
  cover_art_designer = 'cover_art_designer',
  graphic_designer = 'graphic_designer',
}

export enum WRITING_ROLES {
  author = 'author',
  co_writer = 'co_writer',
  editor = 'editor',
  editorial_director = 'editorial_director',
  fact_checker = 'fact_checker',
  guest_writer = 'guest_writer',
  logger = 'logger',
  managing_editor = 'managing_editor',
  researcher = 'researcher',
  script_coordinator = 'script_coordinator',
  script_editor = 'script_editor',
  song_writer = 'song_writer',
  story_editor = 'story_editor',
  transcriber = 'transcriber',
  translator = 'translator',
  writer = 'writer',
}

export enum OTHER_ROLES {
  consultant = 'consultant',
  intern = 'intern',
}

export enum EMPTY_ROLE {}

export const podcastRoles = {
  [PODCAST_ROLE_GROUPS.administrator]: ADMINISTRATOR_ROLES,
  [PODCAST_ROLE_GROUPS.audio_production]: EMPTY_ROLE,
  [PODCAST_ROLE_GROUPS.audio_post_production]: EMPTY_ROLE,
  [PODCAST_ROLE_GROUPS.cast]: CAST_ROLES,
  [PODCAST_ROLE_GROUPS.video_production]: EMPTY_ROLE,
  [PODCAST_ROLE_GROUPS.video_post_production]: EMPTY_ROLE,
  [PODCAST_ROLE_GROUPS.community]: COMMUNITY_ROLES,
  [PODCAST_ROLE_GROUPS.creative_director]: EMPTY_ROLE,
  [PODCAST_ROLE_GROUPS.design]: DESIGN_ROLES,
  [PODCAST_ROLE_GROUPS.writing]: WRITING_ROLES,
  [PODCAST_ROLE_GROUPS.other]: OTHER_ROLES,
};
