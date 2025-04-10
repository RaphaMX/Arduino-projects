int tL1[3] = {2, 3, 4};
int tL2[3] = {5, 6, 7};


void setup()
{
    for (int i = 2; i <= 7; i++)
    {
        pinMode(i, OUTPUT);
    }
}

void loop()
{
    digitalWrite(tL1[0], HIGH);
    digitalWrite(tL1[2], LOW);
    digitalWrite(tL2[1], LOW);
    digitalWrite(tL2[2], HIGH);
    delay(3000);
    digitalWrite(tL1[1], HIGH);
    digitalWrite(tL1[0], LOW);
    delay(1000);
    digitalWrite(tL2[2], LOW);
    digitalWrite(tL2[0], HIGH);
    digitalWrite(tL1[2], HIGH);
    digitalWrite(tL1[1], LOW);
    delay(3000);
    digitalWrite(tL2[0], LOW);
    digitalWrite(tL2[1], HIGH);
    delay(1000);
}
