<?php

namespace App\Repositories;

use App\Repositories\Interfaces\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements BaseRepositoryInterface
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function pagination(
        $column = ['*'],
        $condition = [],
        $join = [],
        $extend = [],
        $per_page = 20
    ) {
        $query = $this->model->select($column)->where(function($query) use ($condition) {
            if(isset($condition['keyword']) && !empty($condition['keyword'])) {
                $query->where('name', 'LIKE', '%'.$condition['keyword'].'%');
            }
        });

        if(!empty($join)) {
            $query->join($join);
        }

        return $query->paginate($per_page)->withQueryString()->withPath(env('APP_URL').$extend['path']);
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $model = $this->model->findOrFail($id);
        $model->update($data);
        return $model;
    }

    public function delete($id)
    {
        $model = $this->model->findOrFail($id);
        $model->delete();
        return true;
    }

    public function forceDelete($id) {
        $model = $this->model->findOrFail($id);
        $model->forceDelete();
        return true;
    }
}
