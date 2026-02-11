

board = [1, 2, 3, 4, 5, 6, 7, 8, 9]
moves = []

def display_board():
    for i in range(3):
        for j in range(3):
            index = i * 3 + j
            # If it's the last column, don't print the side pipe
            if j < 2:
                print(board[index], end=" | ")
            else:
                print(board[index])

        # Only print the divider after the first and second rows
        if i < 2:
            print("---------")

def player_input(player_marker):
    while True:
        display_board()
        try:
            move = int(input(f"Player {player_marker}, enter your move (1-9): "))
            if move in board:
                board[move - 1] = player_marker
                break
            else:
                print("\nInvalid move! That spot is taken or out of range.")
        except ValueError:
            print("\nPlease enter a valid number.")

def check_win(current_player):
    if board[0] == current_player and board[1] == current_player and board[2] == current_player:
        return True
    if board[3] == current_player and board[4] == current_player and board[5] == current_player:
        return True
    if board[6] == current_player and board[7] == current_player and board[8] == current_player:
        return True
    if board[0] == current_player and board[3] == current_player and board[6] == current_player:
        return True
    if board[1] == current_player and board[4] == current_player and board[7] == current_player:
        return True
    if board[2] == current_player and board[5] == current_player and board[8] == current_player:
        return True
    if board[0] == current_player and board[4] == current_player and board[8] == current_player:
        return True
    if board[2] == current_player and board[4] == current_player and board[6] == current_player:
        return True
    return False

def play_game():
    current_player = "X"
    for _ in range(9):
        player_input(current_player)
        if check_win(current_player):
            print(f"Player {current_player} wins!")
            break

        if current_player == "X":
            current_player = "O"
        else:
            current_player = "X"
    else:
        print("It's a tie!")

play_game()