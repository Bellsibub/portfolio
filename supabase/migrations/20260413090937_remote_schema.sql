drop extension if exists "pg_net";

drop policy "inventory_items_public_read" on "public"."inventory_items";

revoke delete on table "public"."inventory_items" from "anon";

revoke insert on table "public"."inventory_items" from "anon";

revoke references on table "public"."inventory_items" from "anon";

revoke select on table "public"."inventory_items" from "anon";

revoke trigger on table "public"."inventory_items" from "anon";

revoke truncate on table "public"."inventory_items" from "anon";

revoke update on table "public"."inventory_items" from "anon";

revoke delete on table "public"."inventory_items" from "authenticated";

revoke insert on table "public"."inventory_items" from "authenticated";

revoke references on table "public"."inventory_items" from "authenticated";

revoke select on table "public"."inventory_items" from "authenticated";

revoke trigger on table "public"."inventory_items" from "authenticated";

revoke truncate on table "public"."inventory_items" from "authenticated";

revoke update on table "public"."inventory_items" from "authenticated";

revoke delete on table "public"."inventory_items" from "service_role";

revoke insert on table "public"."inventory_items" from "service_role";

revoke references on table "public"."inventory_items" from "service_role";

revoke select on table "public"."inventory_items" from "service_role";

revoke trigger on table "public"."inventory_items" from "service_role";

revoke truncate on table "public"."inventory_items" from "service_role";

revoke update on table "public"."inventory_items" from "service_role";

alter table "public"."inventory_items" drop constraint "inventory_items_skill_id_fkey";

alter table "public"."inventory_items" drop constraint "inventory_items_pkey";

drop index if exists "public"."inventory_items_pkey";

drop table "public"."inventory_items";


