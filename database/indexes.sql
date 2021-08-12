-- Run to create indexes:
-- Related Table
CREATE INDEX related_index ON related;
CREATE INDEX index_related ON related;
-- Styles Table
CREATE INDEX styles_index ON styles;
-- Features Table
CREATE INDEX index_features ON features;
-- Photos Table
CREATE INDEX index_photos ON photos;
-- SKUS Table
CREATE INDEX index_skus ON skus;

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
--     tablename = 'product_info'; 
