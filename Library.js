const input = require('readline-sync')

///////////////////////// library ////////////////////////////
class User {
    constructor(givenBooks) {
        this.books = givenBooks
        this.records = {}
    };

    //show books of library
    showBooks() {
        console.log();
        for (let i = 0; i < this.books.length; i++) {
            console.log(this.books[i])
        }
        console.log();
        input.question('press any key to continue ')

    };

    //show records [admin]
    showRecords(password) {
        if (password === this.password) {
            console.log('\nUser Reccords : ', this.records, '\n')
        } else {
            console.log("Sorry, I can't show you the data\n")
        }
    }

    ////// add book
    addBook(bookName, noOfBooks, password) {
        if (password === this.password) {
            let rec = {}
            rec[bookName] = noOfBooks
            this.books.push(rec)
            console.log(bookName, 'added to library succesfully\n')

        } else {
            console.log("Sorry, wrong password try again later\n")
        }

    }

};

//Library class
class Library extends User {
    constructor(givenBooks, givenName) {
        super(givenBooks);
        this.password = ''
        console.log(`\nWelcome to ${givenName} Library\n`); //consoling name of the library
    };


    // rent book as per qty
    rentBook(userName, bookName, bookQuantity) {
        let isBookNotThere = true
        let qtyExceeded = true
        for (let i in this.books) {
            if (this.books[i].hasOwnProperty(bookName)) {
                isBookNotThere = false
                if (this.books[i][bookName] >= bookQuantity) {
                    qtyExceeded = false
                    let subdict = {}
                    subdict[bookName] = bookQuantity
                    if (!this.records.hasOwnProperty(userName)) {
                        this.records[userName] = [subdict]
                    }
                    else { 
                        for (let i in this.records[userName]){
                            if(this.records[userName][i].hasOwnProperty(bookName)){
                                this.records[userName][i][bookName]+=bookQuantity
                            }else{
                                this.records[userName].push(subdict) 
                            }
                        }
                    }

                    this.books[i][bookName] -= bookQuantity
                    console.log(`${bookQuantity} ${bookName} rented succesfully\n`);

                }
            }
        }
        //for msg
        if(qtyExceeded){
            console.log(`we don't have [ ${bookQuantity} ] books\n`)
        }
        if(isBookNotThere){
            console.log(`we don't have [ ${bookName} ] book`)
        }

    };

    //// return book as per book name
    returnBook(userName, givenBook, bookQty) {
        let isBookNotThere = true
        let qtyExceeded = true
        if(this.records.hasOwnProperty(userName)){
            for(let bookObj of this.records[userName]){
                if(bookObj.hasOwnProperty(givenBook)){
                    isBookNotThere = false
                    if(bookQty<=bookObj[givenBook]){
                        qtyExceeded = false
                        this.records[userName][this.records[userName].indexOf(bookObj)][givenBook] -= bookQty
                        if(this.records[userName][this.records[userName].indexOf(bookObj)][givenBook] == 0){
                            this.records[userName].splice(this.records[userName].indexOf(bookObj), 1)
                        }
                        if(this.records[userName].length == 0){
                            delete this.records[userName]
                        }console.log(`${givenBook} with [ ${bookQty} ] quantity returned succesfully\n`)
                        
                    }
                    else{
                        console.log("jhol mat kr bhai")
                        return 
                    }
                }
            }
            //for msg
            if(qtyExceeded){
                console.log(`You don't have [ ${bookQty} ] books`)
            }
            if(isBookNotThere){
                console.log(`You don't have [ ${givenBook} ] book`)
            }
            for(let i in this.books){
                if(this.books[i].hasOwnProperty(givenBook)){
                    this.books[i][givenBook]+=bookQty
                }
            }
        }else{
            console.log(`user [ ${userName} ] not found in records \n`)
        }


    };
}

///////////////////// object creation and execution /////////////////////////////
Library = new Library([
    { 'The Alchemist': 10 },
    { 'The Jungle Book': 7 },
    { 'The Book Thiefs': 12 },
    { 'EncycloPedia': 5 },
    { 'q': 5 },
    { 'a': 10 }],
    'Open')


let i = 0
while (i < 1) {
    try {
        console.log(
            '\n 1 -> for Display Books\n',
            '2 -> for rent Book\n',
            '3 -> for return Book\n',
            '4 -> for add Book [admin]\n',
            '5 -> show Records [admin]\n',
            '9 -> to quit\n'
        );
        userInput = input.questionInt('What to do : ')
        if (userInput === 1) {
            Library.showBooks()
        }
        else if (userInput === 2) {
            userName = input.question('Enter your Name : ')
            bookName = input.question('Enter Book Name : ')
            bookQuantity = input.questionInt('Enter book quantity : ')
            Library.rentBook(userName, bookName, bookQuantity)
            input.question('press any key to continue ')
        }
        else if (userInput === 3) {
            userName = input.question('Enter your Name : ')
            givenBook = input.question('Enter book Name you want to return : ')
            NumberOfBooks = input.questionInt("Enter the no. of books you wanna return: ")
            Library.returnBook(userName, givenBook, NumberOfBooks)
            input.question('press any key to continue ')

        }
        else if (userInput === 4) {
            bookName = input.question('Enter book name you want to add : ')
            noOfBook = input.questionInt('Enter book quantity : ')
            password = input.question('Enter password : ')
            Library.addBook(bookName, noOfBook, password)
        }
        else if (userInput === 5) {
            password = input.question('Enter admin password : ')
            Library.showRecords(password)

        }

        ///// to quit the programme
        else if (userInput === 9) {
            i++
            console.log('Thank you and happy reading :) ')
        }

    } catch (error) {
        console.log(error, "| try again |")
        continue
    }

}