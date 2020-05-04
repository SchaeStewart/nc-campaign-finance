/* eslint-disable camelcase */
// @ts-check

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createExtension(['pgcrypto', 'pg_trgm', "btree_gist"], { ifNotExists: true });
  pgm.createTable('raw_contributions', {
    id: { type: 'UUID', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    name: { type: 'TEXT' },
    street_line_1: { type: 'TEXT' },
    street_line_2: { type: 'TEXT' },
    city: { type: 'TEXT' },
    state: { type: 'TEXT' },
    zip_code: { type: 'TEXT' },
    profession: { type: 'TEXT' },
    employer_name: { type: 'TEXT' },
    transaction_type: { type: 'TEXT' },
    committee_name: { type: 'TEXT' },
    committee_sboe_id: { type: 'TEXT' },
    committee_street_1: { type: 'TEXT' },
    committee_street_2: { type: 'TEXT' },
    committee_city: { type: 'TEXT' },
    committee_state: { type: 'TEXT' },
    committee_zip_code: { type: 'TEXT' },
    report_name: { type: 'TEXT' },
    date_occurred: { type: 'TEXT' },
    account_code: { type: 'TEXT' },
    amount: { type: 'REAL' },
    form_of_payment: { type: 'TEXT' },
    purpose: { type: 'TEXT' },
    candidate_or_referendum_name: { type: 'TEXT' },
    declaration: { type: 'TEXT' },
  });

  pgm.createTable('contributors', {
    id: { type: 'UUID', primaryKey: true, DEFAULT: 'gen_random_uuid()' },
    name: { type: 'TEXT' },
    street_line_1: { type: 'TEXT' },
    street_line_2: { type: 'TEXT' },
    city: { type: 'TEXT' },
    state: { type: 'TEXT' },
    zip_code: { type: 'TEXT' },
    profession: { type: 'TEXT' },
    employer_name: { type: 'TEXT' },
  });

  pgm.createTable('contributions', {
    source_contribution_id: { type: 'UUID' },
    contributor_id: {
      type: 'UUID',
      DEFAULT: 'gen_random_uuid()',
      references: 'contributors(id)',
      onDelete: 'cascade',
    },
    transaction_type: { type: 'TEXT' },
    committee_name: { type: 'TEXT' },
    committee_sboe_id: { type: 'TEXT' },
    committee_street_1: { type: 'TEXT' },
    committee_street_2: { type: 'TEXT' },
    committee_city: { type: 'TEXT' },
    committee_state: { type: 'TEXT' },
    committee_zip_code: { type: 'TEXT' },
    report_name: { type: 'TEXT' },
    date_occurred: { type: 'TEXT' },
    account_code: { type: 'TEXT' },
    amount: { type: 'REAL' },
    form_of_payment: { type: 'TEXT' },
    purpose: { type: 'TEXT' },
    candidate_or_referendum_name: { type: 'TEXT' },
    declaration: { type: 'TEXT' },
  });

  pgm.createIndex(
    'raw_contributions',
    ['name', 'street_line_1', 'street_line_2'],
    {
      name: 'raw_contributions_name_street_idx',
      method: 'gist',
      ifNotExists: 'true',
    },
  );

};

exports.down = (pgm) => {
  pgm.dropTable('contributions');
  pgm.dropTable('contributors');
  pgm.dropTable('raw_contributions');
  pgm.dropExtension(['pgcrypto', 'pg_trgm', "btree_gist"], { ifNotExists: true });
};
