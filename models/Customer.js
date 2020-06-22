const { Model } = require('objection');


class Customer extends Model {
    static get tableName() {
      return 'customers';
    }

    static get idColumn() {
      return 'customerNumber';
    }

    fullName() {
      return this.firstName + ' ' + this.lastName;
    }
}

module.exports = Customer;