package main

import "testing"

func assertEqual(t *testing.T, a interface{}, b interface{}) {
	if a != b {
		t.Fatalf("%s != %s", a, b)
	}
}

func TestTokenize(t *testing.T) {
    tokens := Tokenize("hello")
    token := tokens[0]
    assertEqual(t, token.Type, "string")
    assertEqual(t, token.Value, "hello")
}
