const { Model } = require('objection');


class Customer extends Model {
    static get tableName() {
      return 'employees';
    }

    static get idColumn() {
      return 'employeeNumber';
    }

    fullName() {
      return this.lastName + ' ' + this.firstName;
    }

    //Validation Json
    static get jsonSchema() {
      return {
        type: 'object',
        required: [ 'employeeNumber', 'lastName', 'firstName', 'email', 'jobTitle', ],
        properties: {
          employeeNumber: {type: 'integer'},
          firstName: {type: 'integer'},
          lastName: {type: 'string'},
          email: {type: 'string'},
          jobTitle: {type: 'string'},
          reportsTo: {type: 'string'},
          officeCode: {type: 'string'},
          extension: {type: 'string'}
        }
      };
    }
  }

    //This object defines the relations to other entities



module.exports = Customer;