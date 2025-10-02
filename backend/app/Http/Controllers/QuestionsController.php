<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class QuestionsController extends Controller
{
    public function index(): \Illuminate\Database\Eloquent\Collection
    {
        return Question::with(['country', 'category', 'difficulty'])->get();
    }

    public function show(Request $request, Question $question): Question
    {
        return $question->load(['country', 'category', 'difficulty', 'options']);
    }

    // Create a new question
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        // dump($request->only('question', 'category', 'difficulty', 'options'));
        $request->validate([
            'text' => 'required|string',
            'country_id' => 'required|integer|exists:countries,id',
            'category_id' => 'required|integer|exists:categories,id',
            'difficulty_id' => 'required|integer|exists:difficulties,id',
            'options' => 'required|array',
            'options.*.text' => 'required|string',
            'options.*.is_correct' => ['required', Rule::in([0, 1, true, false])],
        ]);

        $question = Question::create($request->only(['text', 'country_id', 'category_id', 'difficulty_id']));

        $question->options()->createMany($request->options);
        return response()->json(['question' => $question->load('options'), 'options' => $request->options], 201);
    }

    // Update question
    public function update(Request $request, Question $question): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'text' => 'required|string',
            'country_id' => 'required|integer|exists:countries,id',
            'category_id' => 'required|integer|exists:categories,id',
            'difficulty_id' => 'required|integer|exists:difficulties,id',
            'options' => 'required|array',
            'options.*.text' => 'required|string',
            'options.*.is_correct' => ['required', Rule::in([0, 1, true, false])],
        ]);

        $question->update($request->only(['text', 'country_id', 'category_id', 'difficulty_id']));

        // Handle options update/create logic
        foreach ($request->options as $option) {
            if (isset($option['id']) && $option['id']) {
                // Update existing option
                $question->options()->where('id', $option['id'])->update([
                    'text' => $option['text'],
                    'is_correct' => $option['is_correct']
                ]);
            } else {
                // Create new option (no ID provided)
                $question->options()->create([
                    'text' => $option['text'],
                    'is_correct' => $option['is_correct']
                ]);
            }
        }


        return response()->json($question);
    }

    // Delete question
    public function destroy(Question $question): \Illuminate\Http\JsonResponse
    {
        $question->delete();
        return response()->json(['message' => 'Question deleted']);
    }
}