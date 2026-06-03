create type "public"."skill-importance" as enum ('primary', 'secondary', 'tertiary');

alter table "public"."quest_skills" add column "skill_importance" public."skill-importance" not null default 'primary'::public."skill-importance";


