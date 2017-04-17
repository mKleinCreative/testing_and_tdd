
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable( 'cities', function( table ) {
          table.string( 'name' )
          table.integer( 'zip_code' )
          table.unique([ 'zip_code' ])
      })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable( 'cities' )
    ])
  
};
