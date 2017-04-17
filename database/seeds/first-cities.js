
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cities').del()
    .then(function () {
      // Inserts seed entries
      return knex('cities').insert([
        { name: 'San Diego', zip_code: 22434 },
        { name: 'San Francisco', zip_code: 94016 },
        { name: 'Seattle', zip_code: 98101 }
      ]);
    });
};
