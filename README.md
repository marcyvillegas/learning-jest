# File Structure

`/` &larr; pure jest <br>
|- `/learning-react-testing` &larr; with React

---

# Matchers

### <i>Truthiness</i>

- `toBeNull` matches only null
- `toBeUndefined` matches only undefined
- `toBeDefined` is the opposite of `toBeUndefined`
- `toBeTruthy` matches anything that an if statement treats as true
- `toBeFalsy` matches anything that an if statement treats as false

### <i>Numbers</i>

```js
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

### <i>Strings</i>

- uses regular expressions

```js
test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});
```

### <i>Arrays and iterables</i>

```js
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
});
```

- `Set` object lets you store unique values of any type, whether primitive values or object references.

### <i>Exceptions</i>

- test whether a particular function throws an error when it's called

```js
function compileAndroidCode(): void {
  throw new Error("you are using the wrong JDK!");
}

test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // Or you can match an exact error message using a regexp like below
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});
```

---

# Testing Asynchronous Code

### <i>Promises</i>

```js
test("the data is peanut butter", () => {
  return fetchData().then((data) => {
    expect(data).toBe("peanut butter");
  });
});
```

### <i>Async/Await</i>

```js
test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch("error");
  }
});
```

```js
test("the data is peanut butter", async () => {
  await expect(fetchData()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  await expect(fetchData()).rejects.toMatch("error");
});
```

### <i>Callbacks</i>

```js
test("the data is peanut butter", (done) => {
  function callback(error, data) {
    if (error) {
      done(error);
      return;
    }
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

- The test will complete as soon as fetchData completes, before ever calling the callback
- Jest will wait until the done callback is called before finishing the test

### <i>.resolves / .rejects</i>

```js
test("the data is peanut butter", () => {
  return expect(fetchData()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", () => {
  return expect(fetchData()).rejects.toMatch("error");
});
```
