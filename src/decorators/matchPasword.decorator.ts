import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPassword implements ValidatorConstraintInterface {
  validate(
    password: any,
    args: ValidationArguments,
  ): Promise<boolean> | boolean {
    // comparar la password con la password de confirmacion
    if (password !== (args.object as any)[args.constraints[0]]) return false;
    return true;
  }

  // si la validacion falla
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args?: ValidationArguments): string {
    return `Password and password confirmation don't match`;
  }
}
