import Document from '@/pages/_document';
import { describe, expect, test } from 'vitest';

describe('Document component', () => {
  test('should render Document component from _document without crash', async () => {
    const html = Document();
    expect(html.props.lang).toEqual('en');
  });
});
