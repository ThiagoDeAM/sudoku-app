class Sudoku {
    constructor(N, K) {
        this.N = N;
        this.K = K;
        this.SRN = Math.floor(Math.sqrt(N));
        this.mat = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
    }

    fillValues() {
        this.fillDiagonal();
        this.fillRemaining(0, this.SRN);
        this.removeKDigits();
    }

    fillDiagonal() {
        for (let i = 0; i < this.N; i += this.SRN) {
            this.fillBox(i, i);
        }
    }

    unUsedInBox(rowStart, colStart, num) {
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                if (this.mat[rowStart + i][colStart + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    fillBox(row, col) {
        let num;
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                do {
                    num = this.randomGenerator(this.N);
                } while (!this.unUsedInBox(row, col, num));
                this.mat[row + i][col + j] = num;
            }
        }
    }

    randomGenerator(num) {
        return Math.floor(Math.random() * num + 1);
    }

    checkIfSafe(i, j, num) {
        return this.unUsedInRow(i, num) && this.unUsedInCol(j, num) && this.unUsedInBox(i - i % this.SRN, j - j % this.SRN, num);
    }

    unUsedInRow(i, num) {
        return !this.mat[i].includes(num);
    }

    unUsedInCol(j, num) {
        return !this.mat.some(row => row[j] === num);
    }

    fillRemaining(i, j) {
        if (i === this.N - 1 && j === this.N) return true;
        if (j === this.N) {
            i++;
            j = 0;
        }
        if (this.mat[i][j] !== 0) return this.fillRemaining(i, j + 1);
        for (let num = 1; num <= this.N; num++) {
            if (this.checkIfSafe(i, j, num)) {
                this.mat[i][j] = num;
                if (this.fillRemaining(i, j + 1)) return true;
                this.mat[i][j] = 0;
            }
        }
        return false;
    }

    removeKDigits() {
        let count = this.K;
        while (count !== 0) {
            let i = Math.floor(Math.random() * this.N);
            let j = Math.floor(Math.random() * this.N);
            if (this.mat[i][j] !== 0) {
                this.mat[i][j] = 0;
                count--;
            }
        }
    }
}

export default Sudoku;