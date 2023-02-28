import { data } from "./object-assignment";

test('object assignment', () => {
    expect(data).toEqual({one: 1, two: 2});
  });