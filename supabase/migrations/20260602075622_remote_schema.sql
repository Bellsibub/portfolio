alter type "public"."quest-status" rename to "quest-status__old_version_to_be_dropped";

create type "public"."quest-status" as enum ('active', 'maintenance', 'archived', 'enhancement');

alter table "public"."quests" alter column status type "public"."quest-status" using status::text::"public"."quest-status";

drop type "public"."quest-status__old_version_to_be_dropped";

alter table "public"."quests" drop column "is_completed";


