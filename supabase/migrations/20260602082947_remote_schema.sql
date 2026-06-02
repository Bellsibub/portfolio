create type "public"."skill-category" as enum ('framework', 'language', 'runtime', 'styling', 'tool', 'skill');

alter table "public"."skills" drop constraint "skills_category_check";

alter table "public"."skills" drop constraint "skills_parent_id_fkey";

alter table "public"."skills" drop column "parent_id";

alter table "public"."skills" add column "equipped" boolean;

alter table "public"."skills" add column "highlights" text[];

alter table "public"."skills" alter column "category" drop not null;

alter table "public"."skills" alter column "category" set data type public."skill-category" using "category"::public."skill-category";


