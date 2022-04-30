class algorithmIonEngine {
	constructor(parameters) {
		this.parameter = JSON.parse(parameters);
		console.log('Start:' + ' ' + parameters)
		this.cells = this.parameter.cells
		this.corrections = this.parameter.corrections
		this.deltaVelocity = 0
		this.mainThruster = []
		this.secThruster = []
	}
	algorithmEngine() {
		return this.corrections.forEach(correct => this.algoritmCorrection(correct))
	}
	algoritmCorrection(correct) {
		if (this.cells.length == 0) {

			this.mainThruster.push(0)
			this.secThruster.push(0)
		} else {
			for (let key in this.cells) {
				let engineTwo = this.cells[key] / 2
				if (engineTwo == correct) {
					this.mainThruster.push(0)
					this.secThruster.push(this.cells[key])
					this.cells.splice(this.cells.indexOf(this.cells[key]), 1)
				} else if (this.cells[key] == correct) {
					this.mainThruster.push(this.cells[key])
					this.secThruster.push(0)
					this.cells.splice(this.cells.indexOf(this.cells[key]), 1)
				} else if (this.cells[key] < correct) {

					if (this.cells.length == 1) {
						this.mainThruster.push(this.cells[key])
						this.secThruster.push(0)
						this.cells.splice(this.cells.indexOf(this.cells[key]), 1)
					} else {
						let resultOneTwo = 0
						let resultTwoOne = 0
						let mainThrusterCellOne = 0
						let mainThrusterCellTwo = 0
						let secThrusterCellOne = 0
						let secThrusterCellTwo = 0
						for (let key1 in this.cells) {
							if (this.cells[key] != this.cells[key1]) {
								let engineTwo = this.cells[key1] / 2
								let sum = this.cells[key] + engineTwo
								if (resultOneTwo < sum && sum <= correct) {
									resultOneTwo = sum
									mainThrusterCellOne = this.cells[key]
									mainThrusterCellTwo = this.cells[key1]
								}
							}
						}
						for (let key1 in this.cells) {
							if (this.cells[key] != this.cells[key1]) {
								let engineTwo = this.cells[key] / 2
								let sum = this.cells[key1] + engineTwo
								if (resultTwoOne < sum && sum <= correct) {
									resultTwoOne = sum
									secThrusterCellOne = this.cells[key1]
									secThrusterCellTwo = this.cells[key]
								}
							}
						}
						if (resultOneTwo > resultTwoOne) {
							this.mainThruster.push(mainThrusterCellOne)
							this.secThruster.push(mainThrusterCellTwo)
							this.cells.splice(this.cells.indexOf(mainThrusterCellOne), 1)
							this.cells.splice(this.cells.indexOf(mainThrusterCellTwo), 1)
							break
						} else {
							this.mainThruster.push(secThrusterCellOne)
							this.secThruster.push(secThrusterCellTwo)
							this.cells.splice(this.cells.indexOf(secThrusterCellOne), 1)
							this.cells.splice(this.cells.indexOf(secThrusterCellTwo), 1)
							break
						}
					}
				}
			}
		}
	}
	getOutputJson() {
		this.mainThrusterSumSpeed = this.mainThruster.reduce((a, b) => a + b)
		this.secThrusterSumSpeed = this.secThruster.reduce((a, b) => a + b) / 2
		return JSON.stringify({
			mainThruster: this.mainThruster,
			secThruster: this.secThruster,
			deltaVelocity: this.mainThrusterSumSpeed + this.secThrusterSumSpeed
		})
	}
}

let jsonString = JSON.stringify({
	corrections: [1, 12, 7, 1], // манёвры м/с
	cells: [8, 4, 6, 2, 2] // доступные капсулы
});

const algorithmIon = new algorithmIonEngine(jsonString)
algorithmIon.algorithmEngine()
console.log(algorithmIon.getOutputJson())

let jsonString2 = JSON.stringify({
	corrections: [1, 12, 10, 6], // манёвры м/с
	cells: [6, 10, 6, 4, 2, 2, 4] // доступные капсулы
});

const algorithmIon2 = new algorithmIonEngine(jsonString2)
algorithmIon2.algorithmEngine()
console.log(algorithmIon2.getOutputJson())