import SQLite from 'react-native-sqlite-storage'

const db = SQLite.openDatabase({ name: 'contacts.db', createFromLocation: '~www/contacts.db' },
  () => {
    console.log('Base de dados aberta com sucesso!');
  },
  error => {
    console.log('Erro ao abrir a base de dados:' + error)
  })

/**
 * Insert new client in th database
 * @param {*} name string client's name to insert in the database
 * @param {*} phone string client's phone to insert in the database
 * @returns promise with the number of rowsAffected, or error
 */
export const addUser = (name, phone) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO clients (name, phone) VALUES (?,?)',
      [name, phone],
      (tx, results) => {
        resolve(results.rowsAffected)
      }),
      error => {
        reject(error)
      }
    })
  })
}

export const listUsers = (setList, letter) => {
  db.transaction(tx => {
    tx.executeSql('SELECT name, phone, id_client FROM clients WHERE name LIKE ?',
    [letter+'%'],
    (tx, results) => {
      const rows = []

      for(let i = 0; i < results.rows.length; i++) {
        rows.push(results.rows.item(i))
        setList(rows)
      }
    })
  })
}

/**
 * Search in the database the name 
 */
/* export const searchPhone = (name, setClient) => {
  db.transaction(tx => {
    tx.executeSql('SELECT name, phone FROM clients WHERE name = ?',
    [name],
    (tx, results) => {
      const rows = []
      
      if(results.rows.length > 0) {
        setClient(results.rows.item(0))
      }
    })
  })
} */

/**
 * Search in the database the name if it has an phone number
 * @param {*} name string with the name of the client
 * @returns promise with the result, or error
 */
export const searchPhone = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT phone FROM clients WHERE name = ?',
      [name],
      (tx, results) => {
        resolve(results)
      }),
      error => {
        reject(error)
      }
    })
  })
}



/**
 * Search in the database if the phone number has an owner
 * @param {*} phone string with the phone number to search
 * @returns promise with the result, or error
 */
export const searchName = (phone) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT name FROM clients WHERE phone = ?',
      [phone],
      (tx, results) => {
        resolve(results)
      }),
      error => {
        reject(error)
      }
    })
  })
}

export const searchEdit = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM clients WHERE name = ?',
      [name],
      (tx, results) => {
        /*const rows = []
        
        if(results.rows.length > 0) {
          setClient(results.rows.item(0))
          setExistsName((prevState) => !prevState)
        }*/
        resolve(results.rows)
      }),
      error => {
        reject(error)
      }
    })
  })
}

/**
 * Update the client in DB with the new values
 * @param {*} name string new name
 * @param {*} phone string new phone
 * @param {*} id_client number client index in the DB
 */
export const updateClient = (name, phone, id_client) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE clients SET name = ?, phone = ? WHERE id_client = ?',
    [name, phone, id_client],
    (tx, results) => {
      const rows = []
      
      if(results.rows.length > 0) {
        console.log('alterado');
      }
    })
  })
}

/**
 * Search in the DB if the name already exists 
 * @param {*} name string that contains the name that we have to search
 * @returns the client id if the name exists or error
 */
export const searchNameExists = name => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT id_client FROM clients WHERE name = ?',
      [name],
      (tx, results) => {
        resolve(results.rows)
      }),
      error => {
        reject(error)
      }
    })
  })
}

/**
 * Search in the Db if the client phone already exists
 * @param {*} phone 
 * @returns the client id if the phone exists or error
 */
export const searchPhoneExists = phone => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT id_client FROM clients WHERE phone = ?',
      [phone],
      (tx, results) => {
        resolve(results.rows)
      }),
      error => {
        reject(error)
      }
    })
  })
}