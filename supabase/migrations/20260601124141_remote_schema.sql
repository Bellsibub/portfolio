


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."quest-status" AS ENUM (
    'active',
    'maintenance',
    'archived'
);


ALTER TYPE "public"."quest-status" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."character" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "title" "text" NOT NULL,
    "tagline" "text",
    "cv_url" "text",
    "stats" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "avatar_url" "text"
);


ALTER TABLE "public"."character" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."contact_messages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "subject" "text" NOT NULL,
    "message" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."contact_messages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."lore_sections" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "order" smallint DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."lore_sections" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quest_images" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "quest_id" "uuid" NOT NULL,
    "url" "text" NOT NULL,
    "label" "text" NOT NULL,
    "order" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."quest_images" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quest_skills" (
    "quest_id" "uuid" NOT NULL,
    "skill_id" "uuid" NOT NULL
);


ALTER TABLE "public"."quest_skills" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quests" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "summary" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "level" "text" NOT NULL,
    "difficulty" "text" NOT NULL,
    "is_completed" boolean DEFAULT false NOT NULL,
    "is_featured" boolean DEFAULT false NOT NULL,
    "image_url" "text",
    "demo_link" "text",
    "github_link" "text",
    "reflections" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "status" "public"."quest-status",
    CONSTRAINT "quests_difficulty_check" CHECK (("difficulty" = ANY (ARRAY['easy'::"text", 'medium'::"text", 'hard'::"text", 'legendary'::"text"]))),
    CONSTRAINT "quests_level_check" CHECK (("level" = ANY (ARRAY['novice'::"text", 'apprentice'::"text", 'adept'::"text", 'master'::"text"])))
);


ALTER TABLE "public"."quests" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."skills" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "description" "text",
    "category" "text" NOT NULL,
    "parent_id" "uuid",
    "icon_name" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "skills_category_check" CHECK (("category" = ANY (ARRAY['language'::"text", 'framework'::"text", 'library'::"text", 'tool'::"text", 'styling'::"text", 'runtime'::"text"])))
);


ALTER TABLE "public"."skills" OWNER TO "postgres";


ALTER TABLE ONLY "public"."character"
    ADD CONSTRAINT "character_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."contact_messages"
    ADD CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."lore_sections"
    ADD CONSTRAINT "lore_sections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quest_images"
    ADD CONSTRAINT "quest_images_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quest_skills"
    ADD CONSTRAINT "quest_skills_pkey" PRIMARY KEY ("quest_id", "skill_id");



ALTER TABLE ONLY "public"."quests"
    ADD CONSTRAINT "quests_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quests"
    ADD CONSTRAINT "quests_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."quest_images"
    ADD CONSTRAINT "quest_images_quest_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "public"."quests"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quest_skills"
    ADD CONSTRAINT "quest_skills_quest_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "public"."quests"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quest_skills"
    ADD CONSTRAINT "quest_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."skills"("id") ON DELETE SET NULL;



ALTER TABLE "public"."character" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "character_admin_write" ON "public"."character" USING (("auth"."role"() = 'authenticated'::"text")) WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "character_public_read" ON "public"."character" FOR SELECT USING (true);



ALTER TABLE "public"."contact_messages" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "contact_messages_admin_all" ON "public"."contact_messages" USING (("auth"."role"() = 'authenticated'::"text")) WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "contact_messages_public_insert" ON "public"."contact_messages" FOR INSERT WITH CHECK (true);



ALTER TABLE "public"."lore_sections" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "lore_sections_admin_write" ON "public"."lore_sections" USING (("auth"."role"() = 'authenticated'::"text")) WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "lore_sections_public_read" ON "public"."lore_sections" FOR SELECT USING (true);



ALTER TABLE "public"."quest_images" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "quest_images_admin_write" ON "public"."quest_images" USING (("auth"."role"() = 'authenticated'::"text")) WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "quest_images_public_read" ON "public"."quest_images" FOR SELECT USING (true);



ALTER TABLE "public"."quest_skills" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "quest_skills_admin_write" ON "public"."quest_skills" USING (("auth"."role"() = 'authenticated'::"text")) WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "quest_skills_public_read" ON "public"."quest_skills" FOR SELECT USING (true);



ALTER TABLE "public"."quests" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "quests_admin_write" ON "public"."quests" USING (("auth"."role"() = 'authenticated'::"text")) WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "quests_public_read" ON "public"."quests" FOR SELECT USING (true);



ALTER TABLE "public"."skills" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "skills_admin_write" ON "public"."skills" USING (("auth"."role"() = 'authenticated'::"text")) WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "skills_public_read" ON "public"."skills" FOR SELECT USING (true);





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";





































































































































































GRANT ALL ON TABLE "public"."character" TO "anon";
GRANT ALL ON TABLE "public"."character" TO "authenticated";
GRANT ALL ON TABLE "public"."character" TO "service_role";



GRANT ALL ON TABLE "public"."contact_messages" TO "anon";
GRANT ALL ON TABLE "public"."contact_messages" TO "authenticated";
GRANT ALL ON TABLE "public"."contact_messages" TO "service_role";



GRANT ALL ON TABLE "public"."lore_sections" TO "anon";
GRANT ALL ON TABLE "public"."lore_sections" TO "authenticated";
GRANT ALL ON TABLE "public"."lore_sections" TO "service_role";



GRANT ALL ON TABLE "public"."quest_images" TO "anon";
GRANT ALL ON TABLE "public"."quest_images" TO "authenticated";
GRANT ALL ON TABLE "public"."quest_images" TO "service_role";



GRANT ALL ON TABLE "public"."quest_skills" TO "anon";
GRANT ALL ON TABLE "public"."quest_skills" TO "authenticated";
GRANT ALL ON TABLE "public"."quest_skills" TO "service_role";



GRANT ALL ON TABLE "public"."quests" TO "anon";
GRANT ALL ON TABLE "public"."quests" TO "authenticated";
GRANT ALL ON TABLE "public"."quests" TO "service_role";



GRANT ALL ON TABLE "public"."skills" TO "anon";
GRANT ALL ON TABLE "public"."skills" TO "authenticated";
GRANT ALL ON TABLE "public"."skills" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";


  create policy "admin-write 1b5u6jb_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'character-cv'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "admin-write 1b5u6jb_1"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'character-cv'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "admin-write 1b5u6jb_3"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'character-cv'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "admin-write 1kbqpp2_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'character-avatars'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "admin-write 1kbqpp2_1"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'character-avatars'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "admin-write 1kbqpp2_3"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'character-avatars'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "auth-write 111l877_1"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'quest-images'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "auth-write 111l877_2"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'quest-images'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "auth-write 111l877_3"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'quest-images'::text) AND (auth.role() = 'authenticated'::text)));



