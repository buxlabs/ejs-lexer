package main

type Token struct {
	Type, Value string
}

func Tokenize (input string) []Token {
	tokens := []Token{
  	{
  		Type: "string",
  		Value: input,
  	},
  }
	return tokens
}
