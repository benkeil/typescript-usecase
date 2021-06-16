import { Observable } from 'rxjs';

export default interface ReactiveOutputPort<I, O> {
  present: I extends void ? () => Observable<O> : (result$: Observable<I>) => Observable<O>;
}
