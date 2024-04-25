import { finalize, Observable, Observer, Subscription } from "rxjs";

export function subscribeOnce<T>(
  observable: Observable<T>,
  observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | undefined
): void {
  const s: Subscription = observable
    .pipe(finalize(() => s.unsubscribe()))
    .subscribe(observerOrNext);
}
