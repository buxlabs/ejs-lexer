package main

import "testing"

func TestTokenize(t *testing.T) {
    assertEqual := func(a interface {}, b interface {}) {
      if a != b { t.Fatalf("%s != %s", a, b) }
    }

    var tokens []Token

    tokens = Tokenize("hello")
    assertEqual(len(tokens), 1)
    assertEqual(tokens[0].Type, "string")
    assertEqual(tokens[0].Value, "hello")

    tokens = Tokenize("<div></div>")
    assertEqual(len(tokens), 1)
    assertEqual(tokens[0].Type, "string")
    assertEqual(tokens[0].Value, "<div></div>")
}
