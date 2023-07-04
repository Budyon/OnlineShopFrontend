<template>
    <div class="container" :style="{ marginTop: '10px',  display: 'grid',  gap: '10px', gridTemplateColumns: `repeat(${ numRepeatColumn }, 100px)`}">
      <TicTac
        v-for="(square, index) in squares"
        :key="index"
        :square="square"
        @square-click="squareClick(square)"
      />

      <div>
        <p>X - {{ xWinCount }}</p>
        <p>O - {{ oWinCount }}</p>
        <p style="color:red">{{ winnerName }}</p>
      <button @click="clearSquare" style="border:none; backgroundColor:black; color:white">Reset</button>
      </div>
      <b-input-group size="sm" class="mb-2" style="width: 150px; height: 20px" >
        <b-form-input  inputmode="numeric" :maxlength="10" type="number"  @keyup="handleInput"></b-form-input>
      </b-input-group>
    </div>
</template>

<script>
import TicTac from './Tic-Tac.vue';
export default {

  components: {
    TicTac
  },

  data() {
    return {
      squares: [
        {
          state: null,
          position: 1
        },
        {
          state: null,
          position: 2
        },
        {
          state: null,
          position: 3
        },
        {
          state: null,
          position: 4
        },
        {
          state: null,
          position: 5
        },
        {
          state: null,
          position: 6
        },
        {
          state: null,
          position: 7
        },
        {
          state: null,
          position: 8
        },
        {
          state: null,
          position: 9
        }
      ],
      bool: true,
      xArr: [],
      oArr: [],
      winArr: [],
      //  [
      //   [1,2,3],
      //   [4,5,6],
      //   [7,8,9],
      //   [1,4,7],
      //   [2,5,8],
      //   [3,6,9],
      //   [1,5,9],
      //   [3,5,7]
      // ],
      winCount: 0,
      xWinCount: 0,
      oWinCount: 0,
      winnerName: '',
      numRepeatColumn: 3,
    }
  },

  methods: {
    createWinArr() {
      let inputValue = this.numRepeatColumn 
      if(!isNaN(inputValue)) {
        let num = 1
        let k = 1
        let y = 1
        let g = inputValue
      for(let i = 1; i < inputValue * 2 + 3; i++) {
        let arr = []
        for(let x = 1; x < inputValue + 1; x++) {
          if(inputValue * 2 + 2 - i === 1) {
            if(x === 1) {
              num = y
              y++
            }
            arr.push(num)
            num += inputValue + 1
          }
          else if(inputValue * 2 + 2 - i === 0) {
            if(x === 1) {
              num = g
              g++
            }
            arr.push(num)
            num += inputValue - 1
          } else if(inputValue < i && i <= inputValue * 2) {
            if(x === 1) {
              num = k
              k++
            }
            arr.push(num)
            num += inputValue
          } else {
            arr.push(num)
            num++
          }

        }
        this.winArr.push(arr)
      }
      console.log(this.winArr)
    }
    },

    handleInput(value) {
      this.winArr.length = 0
      this.squares.length = 0
      let inputValue = parseInt(value.srcElement._value)
      if(isNaN(inputValue)) {
        this.squares.length = 0
        inputValue = 3
      } else {
        for(let i = 0; i < inputValue * inputValue; i++ ) {
        this.squares.push(
          {
            state: null,
            position: i + 1
          }
        )
        }
        this.numRepeatColumn = inputValue
        this.createWinArr()
      }
    },
    clearSquare() {
      this.squares.forEach((element)=> {
        element.state = null
      })
      this.bool = true
      this.xArr = []
      this.oArr = []
      this.xWinCount = 0
      this.oWinCount = 0
      this.winnerName = ''
    },
    checkWhoWin (arr, winner) {
      for(let i = 0; i < this.winArr.length; i++) {
          for(let x = 0; x < this.winArr[i].length; x++) {
            if(arr.includes(this.winArr[i][x])) {
              this.winCount++
              continue
            }
            break
          }
          if(this.winCount === this.numRepeatColumn) {
            this.winnerName = `Win ${ winner }` 
            if(winner === 'X')
            this.xWinCount++
            if(winner === 'O')
            this.oWinCount++
            this.winCount = 0
            break
          } else {
            this.winCount = 0
          }
        }
    }, 
    squareClick(square) {
      if(this.xWinCount === 0 && this.oWinCount === 0) {
        if(this.bool) {
          square.state = 'x'
          this.xArr.push(square.position)
          this.bool = false
        }else {
          square.state = 'o'
          this.oArr.push(square.position)
          this.bool = true
        }
      
      if(this.xArr.length >= this.numRepeatColumn) {
        this.checkWhoWin(this.xArr, 'X')
      }
      
      if(this.oArr.length >= this.numRepeatColumn) {
        this.checkWhoWin(this.oArr, 'O')
      }
    }
    }
  },
  mounted() {
    this.createWinArr()
  }
}
</script>

<style scoped>
  .square {
        background: red;
        height: 100px;
        width: 100px;
        border-radius: 7px;
  }
</style>