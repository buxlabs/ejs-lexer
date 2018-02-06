var isOperator = function (c) { return /[+\-*\/\^%=(),]/.test(c); },
    isDigit = function (c) { return /[0-9]/.test(c); },
    isWhiteSpace = function (c) { return /\s/.test(c); },
    isIdentifier = function (c) { return typeof c === "string" && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c); };

var lex = function (input) {

    var tokens = [], c, i = 0;
    var next = function () { return c = input[++i]; };
    var addToken = function (type, value) {
        tokens.push({ type, value });
    };
    while (i < input.length) {
        c = input[i];
        if (isWhiteSpace(c)) next();
        else if (isOperator(c)) {
            addToken(c);
            next();
        }
        else if (isDigit(c)) {
            var num = c;
            while (isDigit(next())) num += c;
            if (c === ".") {
                do num += c; while (isDigit(next()));
            }
            num = parseFloat(num);
            if (!isFinite(num)) throw "Number is too large or too small for a 64-bit double.";
            addToken("number", num);
        }
        else if (isIdentifier(c)) {
            var idn = c;
            while (isIdentifier(next())) idn += c;
            addToken("identifier", idn);
        }
        else throw "Unrecognized token.";
    }
    addToken("(end)");
    return tokens;
};

module.exports = lex;
