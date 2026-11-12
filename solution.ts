//Interface representing a Customer and holding their details

interface Customer {
    customerNumber: number;
    name: string;
    windows: number;
}

//Interface representing a booking, which has a relationship with a customer

interface Booking {
    bookingNumber: number;
    customerNumber: number;
    date: string;
}

//Hardcoded customer data

const customers: Customer[] = [
    { customerNumber: 1, name: "John", windows: 10 },
    { customerNumber: 2, name: "Paul", windows: 5 },
    { customerNumber: 3, name: "Ringo", windows: 12 },
    { customerNumber: 4, name: "George", windows: 4 },
];

//Harcoded customer booking

const bookings: Booking[] = [
    { bookingNumber: 1, customerNumber: 4, date: "2025-10-01" },
    { bookingNumber: 2, customerNumber: 2, date: "2026-01-10" },
    { bookingNumber: 3, customerNumber: 1, date: "2025-10-01" },
    { bookingNumber: 4, customerNumber: 3, date: "2025-10-01" },
];

//Customer map associating a customer number to a customer. Derived from data from customer and booking tables.

const customerMap = new Map<number, Customer>(
    customers.map(c => [c.customerNumber, c])
);

//Function to get the total number of windows that would be cleaned on a particular date.

function getTotalNumOfWindowsForAParticularDate(date: string): number {
    let totalWindows = 0;

    for (const booking of bookings) {
        if (booking.date === date) {
            const customer = customerMap.get(booking.customerNumber);
            if (customer) {
                totalWindows += customer.windows;
            }
        }
    }

    return totalWindows;
}

//Function to calculate the total cost of a booking.

function calculateTotalCostOfBooking(bookingNumber: number): number {
    const booking = bookings.find(b => b.bookingNumber === bookingNumber);
    if (!booking) {
        throw new Error(`Booking number ${bookingNumber} not found.`);
    }

    const customer = customerMap.get(booking.customerNumber);
    if (!customer) {
        throw new Error(`Customer number ${booking.customerNumber} not found.`);
    }

    const propertyFee = 5.00;
    const windowFee = customer.windows * 1.00;

    return propertyFee + windowFee;
}

const dateInput = "2025-10-01";
const numberOfWindows = getTotalNumOfWindowsForAParticularDate(dateInput);
console.log(`Total number of windows to be cleaned on ${dateInput} is ${numberOfWindows}`);

const bookingNumber = 1;
const totalCostOfBooking = calculateTotalCostOfBooking(bookingNumber);
console.log(`Feature 2: Total cost for booking #${bookingNumber} is  £${totalCostOfBooking.toFixed(2)}`);