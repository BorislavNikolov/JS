function solve(order) {
    let totalIncome = 0;

    while (order.length > 0) {
        let orders = order.shift().split(", ");
        let price = 0;
        let insertedCoins = +orders.shift();
        let drinkType = orders.shift();

        if (drinkType === "coffee") {
            let coffeeType = orders.shift();
            if (coffeeType === "decaf") {
                price = 0.90;
            }

            else {
                price = 0.80;
            }
        }

        else if (drinkType === "tea") {
            price = 0.80;
        }

        let addition = orders.shift();

        if (addition === "milk") {
            price += Math.round(price) * 0.1;
            addition = +orders.shift();
        }

        if (addition !== 0) {
            price += 0.10;
        }

        if (insertedCoins >= price) {
            insertedCoins -= price;
            totalIncome += price;
            console.log(`You ordered ${drinkType}. Price: ${price.toFixed(2)}$ Change: ${insertedCoins.toFixed(2)}$`);
        }

        else {
            console.log(`Not enough money for ${drinkType}. Need ${(price - insertedCoins).toFixed(2)}$ more.`);
        }
    }

    console.log(`Income Report: ${totalIncome.toFixed(2)}$`);
}

solve(['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2', '1.00, coffee, decaf, 0']);
