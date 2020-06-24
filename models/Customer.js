const { Model } = require('objection');


class Customer extends Model {
  static get tableName() {
    return 'customers';
  }

  static get idColumn() {
    return 'customerNumber';
  }

  fullName() {
    return this.contactLastName + ' ' + this.contactFirstName;
  }

  //Validation Json
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['contactLastName', 'contactFirstName', 'customerNumber', 'customerName'],
      properties: {
        customerNumber: { type: 'integer' },
        customerName: { type: 'integer' },
        contactLastName: { type: 'string' },
        contactFirstName: { type: 'string' },
        phone: { type: 'number' },
        city: { type: 'string' },
        state: { type: 'string' },
        salesRepEmployeeNumber: { type: 'integer' },
        creditLimit: { type: 'integer' }
      }
    };
  }

  //This object defines the relations to other entities
  static get relationMappings() {
    const Employee = require('./Employee');

    return {
      employees: {
        relation: Model.BelongsToOneRelation,
        modelClass: Employee,
        join: {
          from: 'customers.salesRepEmployeeNumber',
          to: 'employees.employeeNumber'
        }
      }
    }

  }
}


module.exports = Customer;