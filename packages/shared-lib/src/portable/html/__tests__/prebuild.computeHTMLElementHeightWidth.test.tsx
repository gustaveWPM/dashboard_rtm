import { beforeAll, afterAll, describe, expect, it, vi } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies

import computeHTMLElementHeight from '../computeHTMLElementHeight';
import computeHTMLElementWidth from '../computeHTMLElementWidth';

vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => {
  return {
    bottom: 1029,
    height: 1234,
    right: 3250,
    width: 2500,
    left: 4321,
    top: 1200
  } as DOMRect;
});

vi.spyOn(window, 'getComputedStyle').mockImplementation(() => {
  return {
    marginBottom: '121px',
    marginRight: '302px',
    marginLeft: '928px',
    marginTop: '810px'
  } as CSSStyleDeclaration;
});
vi.resetModules();

describe('computeHTMLElementHeight/computeHTMLElementWidth', () => {
  let fakeElement: HTMLElement;

  beforeAll(() => {
    fakeElement = document.createElement('div');
    fakeElement.setAttribute('data-testid', 'fake-component');
    document.body.appendChild(fakeElement);
  });

  afterAll(() => {
    document.body.removeChild(fakeElement);
    vi.restoreAllMocks();
  });

  it('should return the correct height/width of an element', () => {
    expect(computeHTMLElementHeight(fakeElement)).toBe(2165);
    expect(computeHTMLElementWidth(fakeElement)).toBe(3730);
  });
});
