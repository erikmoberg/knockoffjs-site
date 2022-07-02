export class NumberHelper {
    static getWithWrap(currentNumber, add, upperBound) {
        currentNumber = (currentNumber + add) % (upperBound + 1);
        return currentNumber < 0 ? upperBound : currentNumber;
    }
}
