import { Component, OnInit } from '@angular/core';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  squares: SquareComponent[] | null[];
  xIsNext: boolean;
  winner: 'X' | 'O';

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  public newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player(): SquareComponent {
    const square = new SquareComponent();
    square.value = this.xIsNext ? 'X' : 'O';
    return square;
  }

  /**
   * Event handler to detect when a move is made. If the index corresponds to null,
   * no move done at that location of the board yet. Otherwise, ignore.
   * The player changes as well. Also, check if there is a winner.
   *
   * @param idx index of the clicked SquareComponent
   */
  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  private calculateWinner(): 'X' | 'O' {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a]?.value &&
        this.squares[a]?.value === this.squares[b]?.value &&
        this.squares[a]?.value === this.squares[c]?.value
      ) {
        return this.squares[a].value;
      }
    }
    return null;
  }
}
