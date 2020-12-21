package main

import "testing"

func TestTokenize(test *testing.T) {
    tokens := Tokenize("hello")
    token := tokens[0]
    if token.Type != "string" { test.Errorf("FAIL") }
    if token.Value != "hello" { test.Errorf("FAIL") }
}
