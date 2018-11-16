let f = [];
function factorial(n) {
    if (n == 0 || n == 1)
        return 1;
    if (f[n] > 0)
        return f[n];
    return f[n] = factorial(n - 1) * n;
}

function swap(a, i, j) {
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
}
