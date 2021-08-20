-- Run to create indexes:
CREATE INDEX related_index ON public.related USING btree (related_productid);
CREATE INDEX index_related ON public.related USING btree (productid);
-- Styles
CREATE INDEX styles_index ON public.styles USING btree (productid);
-- Features
CREATE INDEX index_features ON public.features USING btree (productid);
-- Photos
CREATE INDEX index_photos ON public.photos USING btree (styleid);
-- SKUS
CREATE INDEX index_skus ON public.skus USING btree (styleid);

-- If needing to delete indexes for any reason:
-- DROP INDEX related_index;
-- DROP INDEX index_related;
-- DROP INDEX styles_index;
-- DROP INDEX index_features;
-- DROP INDEX index_photos;
-- DROP INDEX index_skus;

-- To view indexes:
-- SELECT
--     indexname,
--     indexdef
-- FROM
--     pg_indexes
-- WHERE
--     tablename = 'related'; 
