import React, { FormEvent } from 'react';

import { trpc } from '../../utils/trpc';

const AddPost: React.FC = () => {
  const utils = trpc.useContext();

  const addPost = trpc.post.add.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
      await utils.post.list.invalidate();
    },
  });

  /**
   * In a real app you probably don't want to use this manually
   * Checkout React Hook Form - it works great with tRPC
   * @see https://react-hook-form.com/
   * @see https://kitchen-sink.trpc.io/react-hook-form
   */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const $form = e.currentTarget;
    const values = Object.fromEntries(new FormData($form));
    const input = {
      title: values.title as string,
      text: values.text as string,
    };
    try {
      await addPost.mutateAsync(input);
      $form.reset();
    } catch (cause) {
      console.error({ cause }, 'Failed to add post');
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col items-center gap-4">
        <h2 className="max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          Add a post
        </h2>

        <form onSubmit={onSubmit}>
          <label className="text-white" htmlFor="title">
            Title:
          </label>
          <br />
          <input
            id="title"
            name="title"
            type="text"
            disabled={addPost.isLoading}
          />
          <br />
          <label className="text-white" htmlFor="text">
            Text:
          </label>
          <br />
          <textarea id="text" name="text" disabled={addPost.isLoading} />
          <br />
          <input
            type="submit"
            disabled={addPost.isLoading}
            className="rounded border border-white from-red-500 to-blue-500 py-2 px-4 font-semibold text-white shadow hover:bg-gradient-to-r"
          />
        </form>
      </div>
    </div>
  );
};

export default AddPost;
